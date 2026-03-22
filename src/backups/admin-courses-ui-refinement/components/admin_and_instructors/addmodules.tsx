"use client"
import { GalleryAdd } from '@/components/icons/modified';
import { Button } from '@/components/ui/button';
import Cropper from 'react-easy-crop';
import { useForm } from 'react-hook-form'
// import { type AddModuleFormValues, useAddCourseSubmit } from '../hooks/use-add-course-submit';
import { type AddModuleFormValues, useAddCourseSubmit } from '@/hooks/use-add-course-submit';
import { useThumbnailCropper } from '@/hooks/use-thumbnail-cropper';

const AddModules = () => {
    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors, setValue } = useForm<AddModuleFormValues>();
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
    <section className='border border-neutral-50 rounded-2xl p-3 space-y-3 h-fit'>
        <p>Course Details</p>

        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3'>
            <fieldset className='grid grid-cols-2 gap-3'>
                <div className='space-y-1'>
                    <fieldset className={`${errors.title ? 'border-red-600' : ''} grid border rounded-lg py-1 px-2`}>
                        <label htmlFor="title">Course title</label>
                        <input type="text" placeholder='Course title' {...register("title", { required: "Course title is required" })} className='outline-none border-none' />
                    </fieldset>
                    {errors.title && <p className='text-xs text-red-600'>{errors.title.message}</p>}
                </div>

                <div className='space-y-1'>
                    <fieldset className={`${errors.duration ? 'border-red-600' : ''} grid border rounded-lg py-1 px-2`}>
                        <label htmlFor="duration">Duration</label>
                        <input type="number" placeholder='Duration' {...register("duration", { required: "Duration is required", valueAsNumber: true, min: { value: 1, message: "Duration must be at least 1" } })} className='outline-none border-none' />
                    </fieldset>
                    {errors.duration && <p className='text-xs text-red-600'>{errors.duration.message}</p>}
                </div>
            </fieldset>
            <fieldset className='grid grid-cols-2 gap-3'>
                <div className='space-y-1'>
                    <fieldset className={`${errors.price ? 'border-red-600' : ''} grid border rounded-lg py-1 px-2`}>
                        <label htmlFor="price">Price</label>
                        <input type="number" placeholder='Price' {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 1, message: "Price must be at least 1" } })} className='outline-none border-none' />
                    </fieldset>
                    {errors.price && <p className='text-xs text-red-600'>{errors.price.message}</p>}
                </div>

                <div className='space-y-1'>
                    <fieldset className={`${errors.instructor ? 'border-red-600' : ''} grid border rounded-lg py-1 px-2`}>
                        <label htmlFor="instructor">Instructor</label>
                        <input type="text" placeholder='Instructor' {...register("instructor", { required: "Instructor is required" })} className='outline-none border-none' />
                    </fieldset>
                    {errors.instructor && <p className='text-xs text-red-600'>{errors.instructor.message}</p>}
                </div>
            </fieldset>
            <fieldset className={`${errors.overview ? 'border-red-600' : ''} grid border rounded-lg py-1 px-2`}>
                <label htmlFor="overview">Course overview</label>
                <input type="text" placeholder='Course overview' {...register("overview", { required: "Course overview is required" })} className='outline-none border-none' />
            </fieldset>
            {errors.overview && <p className='text-xs text-red-600'>{errors.overview.message}</p>}
            <fieldset className={`${errors.thumbnail ? 'border-red-600' : ''} border rounded-lg py-1 px-2 h-36 relative flex flex-col overflow-hidden`}>
                <span className=" text-neutral-700">Cover image</span>
                <div className=' grow text-center'>
                    {previewUrl ? (
                        <img src={previewUrl} alt="Selected cover preview" className="h-full max-h-24 w-full object-cover rounded-md" />
                    ) : (
                        <>
                            <div className=' flex justify-center mb-3'> <GalleryAdd/> </div>
                            <div className=' mb-1 text-neutral-800 text-[14px]'>Click or drag and drop your image</div>
                            <div className=" text-neutral-600 text-[12px] font-normal">PNG, JPEG, WEBP, SVG (5MB max)</div>
                        </>
                    )}
                </div>
                <label className='absolute w-full h-full' htmlFor="thumbnail"></label>
                <input
                    id='thumbnail'
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
                    className='outline-none border-none opacity-0 w-0 h-0 pointer-events-none fixed'
                />
            </fieldset>
            {errors.thumbnail && <p className='text-xs text-red-600'>{errors.thumbnail.message}</p>}

            {errors.root?.serverError?.message && (
                <p className='text-sm text-red-600'>{errors.root.serverError.message}</p>
            )}
            {successMessage && (
                <p className='text-sm text-green-600'>{successMessage}</p>
            )}

            <div className='w-fit'>
                <Button type="submit" disabled={isSubmitting} className='flex border rounded-full w-full py-2 px-4'>
                    {isSubmitting ? "Creating..." : "Add modules"}
                </Button>
            </div>
            {createdCourseId && (
                <p className='text-xs text-neutral-500'>Course reference: {createdCourseId}</p>
            )}
        </form>
        {isCropOpen && cropImageSrc && (
            <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-xl bg-white p-4 space-y-4">
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
  )
}

export default AddModules
