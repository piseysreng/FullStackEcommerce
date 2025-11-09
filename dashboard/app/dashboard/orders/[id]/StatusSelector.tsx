'use client';

import { ChevronDownIcon } from "@/components/ui/icon";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { updateOrderStatus } from "./action";

const statuses = [
    {
        label: 'New',
        value: 'New',
    },
    {
        label: 'Payed',
        value: 'paid',
    },
    {
        label: 'Shipped',
        value: 'shipped',
    },
    {
        label: 'Delivered',
        value: 'delivered',
    },
];

export default function StatusSelector({id, status}: {id: number, status: string}) {
    return (
        <Select defaultValue={status} onValueChange={(value)=> updateOrderStatus(id, value)}>
            <SelectTrigger>
                <SelectInput placeholder="Select option" className="flex-1" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                    <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {statuses.map(status => (
                        <SelectItem key={status.value} label={status.label} value={status.value} />    
                    ))}
                </SelectContent>
            </SelectPortal>
        </Select>
    );
}