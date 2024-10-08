'use client';

import Image from 'next/image';
import { convertFileToUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDropzone } from '@uploadthing/react/hooks';
import { useCallback, Dispatch, SetStateAction } from 'react';
import { generateClientDropzoneAccept } from 'uploadthing/client';

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [setFiles, onFieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
  });

  return (
    <div
      {...getRootProps()}
      className='flex justify-center items-center h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-auth'
    >
      <input {...getInputProps()} className='cursor-pointer' />

      {imageUrl ? (
        <div className='flex h-full w-full flex-1 justify-center'>
          <Image
            src={imageUrl}
            alt='image'
            width={250}
            height={250}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex-center flex-col py-5 text-gray-500'>
          <Image
            src='/assets/icons/upload.svg'
            width={77}
            height={77}
            alt='file upload'
            className='w-[77px] mx-auto'
          />
          <h3 className='mb-2 mt-2 text-center'>Drag photo here</h3>
          <p className='p-medium-12 mb-4 text-center'>SVG, PNG, JPG</p>
          <Button type='button' className='rounded-full' variant={'main'}>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
