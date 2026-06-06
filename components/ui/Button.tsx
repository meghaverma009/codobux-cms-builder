import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'primary' && 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
          variant === 'secondary' && 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400',
          variant === 'ghost' && 'bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300',
          variant === 'danger' && 'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-400',
          size === 'sm' && 'text-xs px-2.5 py-1.5 gap-1',
          size === 'md' && 'text-sm px-3.5 py-2 gap-1.5',
          size === 'lg' && 'text-base px-5 py-2.5 gap-2',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
