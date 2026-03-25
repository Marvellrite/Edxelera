"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Search, ChevronDown, SlidersHorizontal, Edit2, Eye, Trash2 } from "lucide-react";

import CustomAlertDialog from "@/components/admin_and_instructors/features/course/custom-modal";
import { Add, MoreCircle } from "@/components/admin_and_instructors/icons/modified";
import { Badge } from "@/components/admin_and_instructors/ui/badge";
import { Button } from "@/components/admin_and_instructors/ui/button";
import { Pagination } from "@/components/common";
import { useSidebar } from "@/context/sidebar.context";
import { cn } from "@/lib/utils";
import { notificationsExpanded } from "@/mockdata/notifications";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const statusStyles: Record<string, string> = {
  Sent: "is-active",
  Scheduled: "is-scheduled",
  Draft: "is-draft",
};

function NotificationStatusBadge({ status }: { status: string }) {
  return (
    <Badge className={cn("admin-status-badge px-2.5 py-1 text-xs font-semibold", statusStyles[status] ?? "is-draft")}>
      {status}
    </Badge>
  );
}

function NotificationChannelsCell({ channels }: { channels: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {channels.map((channel) => (
        <Badge
          key={channel}
          className="rounded-full border border-[rgba(201,211,223,0.82)] bg-[rgba(247,249,252,0.98)] px-2.5 py-1 text-[11px] font-semibold text-[var(--admin-text-default)]"
        >
          {channel}
        </Badge>
      ))}
    </div>
  );
}

function NotificationRecipientCell({ groups }: { groups: string[] }) {
  const [primaryGroup, ...otherGroups] = groups;

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div className="flex min-w-0 items-center gap-2">
        <Badge className="w-fit rounded-full border border-[rgba(201,211,223,0.82)] bg-[rgba(247,249,252,0.98)] px-2.5 py-1 text-[11px] font-semibold text-[var(--admin-text-default)]">
          {primaryGroup}
        </Badge>

        {otherGroups.length > 0 && (
          <span className="admin-muted truncate text-xs font-medium">{`+ ${otherGroups.length} other${otherGroups.length > 1 ? "s" : ""}`}</span>
        )}
      </div>

      {otherGroups.length > 0 && (
        <p className="admin-row-subtext truncate">{otherGroups.join(", ")}</p>
      )}
    </div>
  );
}

const Page = () => {
  const { toggle } = useSidebar();
  const [query, setQuery] = useState("");
  const [openActionIndex, setOpenActionIndex] = useState<number | null>(null);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const filteredNotifications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return notificationsExpanded;
    }

    return notificationsExpanded.filter((notification) => {
      const haystacks = [
        notification.title,
        ...notification.deliveryChannels,
        ...notification.recipientGroups,
        notification.status,
      ];

      return haystacks.some((value) => value.toLowerCase().includes(normalizedQuery));
    });
  }, [query]);

  const deleteTarget =
    deleteTargetIndex !== null ? filteredNotifications[deleteTargetIndex] : null;

  return (
    <section className={`${toggle ? "col-span-9" : "col-span-8"} mt-4 overflow-y-auto pb-2 no-scrollbar`}>
      <div className="admin-page-frame flex flex-col gap-4 md:gap-5">
        <header className="admin-panel rounded-2xl px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="admin-eyebrow text-xs font-semibold uppercase tracking-[0.14em]">Communication</p>
              <h1 className="admin-title mt-1 text-2xl font-semibold">Notifications</h1>
              <p className="admin-muted admin-page-lead mt-1.5">
                Manage system and user-facing notifications across channels.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <span className="admin-chip admin-chip--compact">
                {filteredNotifications.length} active records
              </span>
              <Button asChild className="h-10 px-4">
                <Link href="/admin/notifications/add-notification">
                  <Add />
                  <span>New Notification</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="admin-panel rounded-2xl p-4 md:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-xl">
              <p className="admin-soft text-[11px] font-semibold uppercase tracking-[0.14em]">Notifications List</p>
              <p className="admin-muted mt-1 text-sm">
                Review delivery channels, recipient groups, and publishing state at a glance.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 xl:max-w-3xl">
              <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-center">
                <div className="admin-input-shell min-w-0 flex-1">
                  <Search className="admin-muted h-4 w-4 shrink-0" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by title, recipient group, or channel"
                    className="h-full w-full bg-transparent text-sm text-[var(--admin-text-default)] outline-none placeholder:text-[var(--admin-text-soft)]"
                  />
                </div>

                <button className="admin-chip admin-chip--ghost lg:min-w-[116px]" type="button">
                  <span>Sort by</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                <button className="admin-chip admin-chip--ghost lg:min-w-[116px]" type="button">
                  <span>Filter</span>
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="admin-table-shell admin-table-shell--spacious mt-5">
            {filteredNotifications.length > 0 ? (
              <table className="admin-data-table min-w-[980px] table-auto text-sm">
                <thead>
                  <tr className="text-left text-xs font-semibold uppercase tracking-[0.12em]">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Delivery Channels</th>
                    <th className="px-4 py-3">Recipient Group</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date Created</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotifications.map((notification, index) => (
                    <tr key={notification.id} className="transition-colors">
                      <td className="admin-muted px-4 py-4 font-semibold">{index + 1}</td>
                      <td className="max-w-[280px] px-4 py-4">
                        <p className="admin-row-title truncate">{notification.title}</p>
                        <p className="admin-row-subtext mt-1 truncate">
                          {notification.content ?? "Notification content preview unavailable."}
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <NotificationChannelsCell channels={notification.deliveryChannels} />
                      </td>
                      <td className="max-w-[220px] px-4 py-4 align-top">
                        <NotificationRecipientCell groups={notification.recipientGroups} />
                      </td>
                      <td className="px-4 py-4">
                        <NotificationStatusBadge status={notification.status} />
                      </td>
                      <td className="admin-muted px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-[var(--admin-text-default)]">
                            {notification.dateCreated}
                          </span>
                          <span className="text-xs">
                            {notification.sentTime
                              ? `Sent ${notification.sentTime}`
                              : notification.scheduledTime
                                ? `Scheduled ${notification.scheduledTime}`
                                : "Awaiting publish"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end">
                          {isHydrated ? (
                            <Popover
                              open={openActionIndex === index}
                              onOpenChange={(isOpen) => setOpenActionIndex(isOpen ? index : null)}
                            >
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  aria-label={`Open actions for ${notification.title}`}
                                  className="inline-flex size-9 items-center justify-center rounded-full border border-transparent transition-colors hover:border-[rgba(201,211,223,0.82)] hover:bg-[rgba(247,249,252,0.98)]"
                                >
                                  <MoreCircle />
                                </button>
                              </PopoverTrigger>

                              <PopoverContent
                                align="end"
                                sideOffset={8}
                                className="w-52 rounded-2xl border-neutral-100 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                              >
                                <div className="flex flex-col gap-1">
                                  <button
                                    type="button"
                                    onClick={() => setOpenActionIndex(null)}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-neutral-900 transition-colors hover:bg-neutral-50"
                                  >
                                    <Eye className="h-4 w-4" />
                                    <span>View Details</span>
                                  </button>

                                  <Link
                                    href="/admin/notifications/add-notification"
                                    onClick={() => setOpenActionIndex(null)}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-neutral-900 transition-colors hover:bg-neutral-50"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                    <span>Edit Notification</span>
                                  </Link>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteTargetIndex(index);
                                      setOpenActionIndex(null);
                                    }}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete Notification</span>
                                  </button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          ) : (
                            <button
                              type="button"
                              aria-label={`Open actions for ${notification.title}`}
                              className="inline-flex size-9 items-center justify-center rounded-full border border-transparent transition-colors hover:border-[rgba(201,211,223,0.82)] hover:bg-[rgba(247,249,252,0.98)]"
                            >
                              <MoreCircle />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty-state mx-2 my-2 flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
                <p className="admin-empty-state__title">No notifications found</p>
                <p className="admin-empty-state__description mt-2 max-w-md">
                  No notifications match your current search. Try a different keyword or create a new notification.
                </p>
                <Button asChild className="mt-5 h-10 px-4">
                  <Link href="/admin/notifications/add-notification">
                    <Add />
                    <span>New Notification</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="admin-action-row mt-4 justify-center border-t-0 pt-0">
            <Pagination />
          </div>
        </div>
      </div>

      <CustomAlertDialog
        isOpen={deleteTargetIndex !== null}
        onClose={() => setDeleteTargetIndex(null)}
        title="Delete Notification"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`
            : "Are you sure you want to delete this notification?"
        }
        actionText="Yes, Delete"
      />
    </section>
  );
};

export default Page;
