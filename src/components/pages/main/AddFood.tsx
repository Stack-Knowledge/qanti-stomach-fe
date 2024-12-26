import usePostStomach from "@/api/hooks/stomach/usePostStomach";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Stomach, FoodCategory, foodCategoryDensity } from "@/types/stomach";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

import { useState, FormEvent } from "react";

interface AddFoodProps extends React.ComponentProps<"form"> {
  userId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Stomach[], Error>>;
}

function AddFood({ className, userId, setOpen, refetch }: AddFoodProps) {
  const [type, setType] = useState<FoodCategory | "">("");
  const [weight, setWeight] = useState<number>();
  const { toast } = useToast();

  const { mutate: postStomach } = usePostStomach(userId, {
    onSettled: () => {
      setOpen(false);
      refetch();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!type || !weight) {
      toast({
        title: "Please fill all blank.",
      });
      return;
    }

    postStomach({
      type,
      weight,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="food" className="text-neutral-700">
          Select Food
        </Label>
        <Select onValueChange={(value: FoodCategory) => setType(value)}>
          <SelectTrigger className="bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-md">
            <SelectValue placeholder="Select food category" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border border-neutral-700">
            {Object.keys(foodCategoryDensity).map((key) => (
              <SelectItem value={key} className="text-neutral-100">
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label className="text-neutral-700" htmlFor="weight">
          Weight (g)
        </Label>
        <Input
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value))}
          id="weight"
          defaultValue=""
          type="number"
          className="text-neutral-700"
        />
      </div>
      <Button type="submit">Add food to Stomach</Button>
    </form>
  );
}

export default AddFood;
