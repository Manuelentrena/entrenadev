import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ModeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            type="button"
            variant="link"
            size="icon"
            className={cn('text-orange-500 hover:text-orange-500', className)}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <SunIcon className="h-full w-full" />
            <MoonIcon className="hidden h-full w-full" />
        </Button>
    );
}
