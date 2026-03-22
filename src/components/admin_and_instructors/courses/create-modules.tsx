import Link from "next/link";

import { AddCircle } from "@/components/admin_and_instructors/icons/modified";
import { Button } from "@/components/admin_and_instructors/ui/button";

interface Props {
  setShowModuleFields: (state: boolean) => void;
  previewHref: string;
  disabled?: boolean;
}

const CreateModules = ({ setShowModuleFields, previewHref, disabled = false }: Props) => {
  return (
    <>
      <button
        type="button"
        className="flex h-20 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white py-3.5 text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={() => setShowModuleFields(true)}
        disabled={disabled}
      >
        <div className="text-center">
          <AddCircle />
        </div>
        <div className="mt-2 text-center text-sm">Add a module</div>
      </button>

      <div className="mt-2 flex flex-wrap items-center justify-end gap-2 border-t border-border/70 pt-3">
        <Button variant="outline" className="h-10 rounded-full px-4">
          Save as draft
        </Button>
        <Button className="h-10 rounded-full px-4" disabled={disabled}>
          <Link href={previewHref}>Proceed</Link>
        </Button>
      </div>
    </>
  );
};

export default CreateModules;
