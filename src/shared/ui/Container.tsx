import type { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/cn';

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-[1220px] px-4 sm:px-6 md:px-8', className)}>{children}</div>;
}
