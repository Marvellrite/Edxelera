"use client";

import { GalleryAdd } from "@/components/icons/modified";
import { Button } from "@/components/ui/button";
import { useThumbnailCropper } from "@/hooks/use-thumbnail-cropper";
import { type AddModuleFormValues, useAddCourseSubmit } from "@/hooks/use-add-course-submit";
import Cropper from "react-easy-crop";
import { useForm } from "react-hook-form";

const AddModules = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    setValue,
  } = useForm<AddModuleFormValues>();

  const { onSubmit, isSubmitting, createdCourseId, successMessage } = useAddCourseSubmit({
    reset,
    setError,
    clearErrors,
  });

  const thumbnailRegister = register("thumbnail", { required: "Cover image is required" });

  const {
    crop,
    setCrop,
    zoom,
    setZoom,
    cropImageSrc,
    previewUrl,
    isCropOpen,
    onCropComplete,
    onSelectImage,
    onCancelCrop,
    onConfirmCrop,
    fileInputRef,
  } = useThumbnailCropper({
    onThumbnailReady: (files) => setValue("thumbnail", files, { shouldValidate: true, shouldDirty: true }),
    onClearThumbnailError: () => clearErrors("thumbnail"),
  });

  return (
    <section className="h-fit space-y-4 rounded-2xl border border-border/70 bg-white p-4 shadow-sm md:p-5">
      <div className="space-y-1">
        <p className="text-lg font-semibold text-neutral-900">Course Details</p>
        <p className="text-xs text-neutral-500">Fill in your course metadata to generate a course reference.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="title" className="text-xs font-medium text-neutral-600">Course title</label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Product Design Foundations"
              {...register("title", { required: "Course title is required" })}
              className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-neutral-800 outline-none transition-shadow focus:ring-2 focus:ring-primary/15 ${
                errors.title ? "border-red-600" : "border-border"
              }`}
            />
            {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="duration" className="text-xs font-medium text-neutral-600">Duration</label>
            <input
              id="duration"
              type="number"
              placeholder="Duration (weeks)"
              {...register("duration", {
                required: "Duration is required",
                valueAsNumber: true,
                min: { value: 1, message: "Duration must be at least 1" },
              })}
              className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-neutral-800 outline-none transition-shadow focus:ring-2 focus:ring-primary/15 ${
                errors.duration ? "border-red-600" : "border-border"
              }`}
            />
            {errors.duration && <p className="text-xs text-red-600">{errors.duration.message}</p>}
          </div>
        </fieldset>

        <fieldset className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="price" className="text-xs font-medium text-neutral-600">Price</label>
            <input
              id="price"
              type="number"
              placeholder="Price"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 1, message: "Price must be at least 1" },
              })}
              className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-neutral-800 outline-none transition-shadow focus:ring-2 focus:ring-primary/15 ${
                errors.price ? "border-red-600" : "border-border"
              }`}
            />
            {errors.price && <p className="text-xs text-red-600">{errors.price.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="instructor" className="text-xs font-medium text-neutral-600">Instructor</label>
            <input
              id="instructor"
              type="text"
              placeholder="Instructor name"
              {...register("instructor", { required: "Instructor is required" })}
              className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-neutral-800 outline-none transition-shadow focus:ring-2 focus:ring-primary/15 ${
                errors.instructor ? "border-red-600" : "border-border"
              }`}
            />
            {errors.instructor && <p className="text-xs text-red-600">{errors.instructor.message}</p>}
          </div>
        </fieldset>

        <div className="space-y-1">
          <label htmlFor="overview" className="text-xs font-medium text-neutral-600">Course overview</label>
          <textarea
            id="overview"
            placeholder="Give a brief overview of this course"
            {...register("overview", { required: "Course overview is required" })}
            className={`min-h-24 w-full rounded-xl border bg-white px-3 py-2 text-sm text-neutral-800 outline-none transition-shadow focus:ring-2 focus:ring-primary/15 ${
              errors.overview ? "border-red-600" : "border-border"
            }`}
          />
          {errors.overview && <p className="text-xs text-red-600">{errors.overview.message}</p>}
        </div>

        <div className="space-y-1">
          <fieldset
            className={`relative flex min-h-44 flex-col rounded-xl border border-dashed px-3 py-3 ${
              errors.thumbnail ? "border-red-600" : "border-neutral-300"
            }`}
          >
            <span className="text-xs font-medium text-neutral-700">Cover image</span>
            <div className="mt-2 flex grow flex-col items-center justify-center text-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Selected cover preview" className="h-full max-h-28 w-full max-w-md rounded-lg object-cover" />
              ) : (
                <>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                    <GalleryAdd />
                  </div>
                  <div className="text-sm text-neutral-800">Click or drag and drop your image</div>
                  <div className="mt-1 text-xs text-neutral-500">PNG, JPEG, WEBP, SVG (5MB max)</div>
                </>
              )}
            </div>
            <label className="absolute inset-0 cursor-pointer" htmlFor="thumbnail" />
            <input
              id="thumbnail"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              {...thumbnailRegister}
              onChange={(event) => {
                thumbnailRegister.onChange(event);
                onSelectImage(event);
              }}
              ref={(element) => {
                thumbnailRegister.ref(element);
                fileInputRef.current = element;
              }}
              className="fixed h-0 w-0 pointer-events-none border-none opacity-0 outline-none"
            />
          </fieldset>
          {errors.thumbnail && <p className="text-xs text-red-600">{errors.thumbnail.message}</p>}
        </div>

        {errors.root?.serverError?.message && <p className="text-sm text-red-600">{errors.root.serverError.message}</p>}
        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
          <Button type="submit" disabled={isSubmitting} className="h-10 rounded-full px-5">
            {isSubmitting ? "Creating..." : "Add modules"}
          </Button>
          {createdCourseId && <p className="text-xs text-neutral-500">Course reference: {createdCourseId}</p>}
        </div>
      </form>

      {isCropOpen && cropImageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4">
          <div className="w-full max-w-lg space-y-4 rounded-xl bg-white p-4">
            <p className="text-sm font-medium text-neutral-900">Crop cover image</p>
            <div className="relative h-72 w-full overflow-hidden rounded-lg bg-neutral-900">
              <Cropper
                image={cropImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="crop-zoom" className="text-xs text-neutral-600">Zoom</label>
              <input
                id="crop-zoom"
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onCancelCrop}>
                Cancel
              </Button>
              <Button type="button" onClick={onConfirmCrop}>
                Apply crop
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddModules;
