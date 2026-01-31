import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Plus} from 'lucide-react';

interface TodoInputProps {
    onAdd: (text: string) => void;
    className?: string;
}

export function TodoInput({onAdd, className}: TodoInputProps) {
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (value.trim()) {
            onAdd(value);
            setValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className={className}>
            <div className="flex gap-2">
                <Input
                    aria-label="New todo"
                    className="flex-1"
                    placeholder="What needs to be done?"
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button
                    aria-label="Add todo"
                    size="default"
                    variant="default"
                    onClick={handleSubmit}
                >
                    <Plus className="size-4" />
                </Button>
            </div>
        </div>
    );
}
