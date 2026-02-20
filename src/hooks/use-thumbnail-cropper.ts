"use client";

import { type Area } from "react-easy-crop";
import { type ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

type UseThumbnailCropperParams = {
  onThumbnailReady: (files: FileList) => void;
  onClearThumbnailError: () => void;
};

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

const getCroppedBlob = async (imageSrc: string, pixelCrop: Area, mimeType: string) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not initialize image cropper.");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Unable to generate cropped image."));
        return;
      }

      resolve(blob);
    }, mimeType || "image/jpeg");
  });
};

export const useThumbnailCropper = ({
  onThumbnailReady,
  onClearThumbnailError,
}: UseThumbnailCropperParams) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const onCropComplete = useCallback((_area: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const resetCropState = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCropImageSrc(null);
    setSelectedFile(null);
    setCroppedAreaPixels(null);
    setIsCropOpen(false);
  };

  const onSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (cropImageSrc) {
      URL.revokeObjectURL(cropImageSrc);
    }

    const localImageUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setCropImageSrc(localImageUrl);
    setIsCropOpen(true);
  };

  const onCancelCrop = () => {
    if (cropImageSrc) {
      URL.revokeObjectURL(cropImageSrc);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    resetCropState();
  };

  const onConfirmCrop = async () => {
    if (!cropImageSrc || !croppedAreaPixels || !selectedFile) {
      return;
    }

    try {
      const croppedBlob = await getCroppedBlob(cropImageSrc, croppedAreaPixels, selectedFile.type);
      const croppedFile = new File([croppedBlob], selectedFile.name, {
        type: selectedFile.type,
        lastModified: Date.now(),
      });

      const transfer = new DataTransfer();
      transfer.items.add(croppedFile);
      onThumbnailReady(transfer.files);
      onClearThumbnailError();

      if (fileInputRef.current) {
        fileInputRef.current.files = transfer.files;
      }

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }

      const nextPreviewUrl = URL.createObjectURL(croppedFile);
      previewUrlRef.current = nextPreviewUrl;
      setPreviewUrl(nextPreviewUrl);
    } finally {
      URL.revokeObjectURL(cropImageSrc);
      resetCropState();
    }
  };

  return {
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
  };
};

