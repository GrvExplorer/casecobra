"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { changeOrderStatus } from "@/lib/server actions/actions";
import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";

export function StatusDropdown({
  orderId,
  orderStatus,
}: {
  orderId: string;
  orderStatus: OrderStatus;
}) {
  const [status, setStatus] = React.useState<OrderStatus>(orderStatus);

  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onError: () => {
      alert("Something went wrong");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-32 items-center justify-between"
        >
          <p className="truncate">{status}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        <DropdownMenuLabel>Order Status</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          defaultValue={status}
          value={status}
          onValueChange={(newValue) => {
            setStatus(newValue as OrderStatus);
            mutate({
              orderId,
              status: newValue as OrderStatus,
            });
          }}
        >
          {Object.keys(OrderStatus).map((status) => (
            <DropdownMenuRadioItem key={status} value={status}>
              {status}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
