import * as React from "react";
import { Input } from "./Input";
import {
  FormField,
  useField,
  useFieldItem,
  usePushItem,
  useRemoveItem
} from "../../src";

export interface Pet {
  name: string;
}

export interface PetListProps {
  pets: FormField<Pet[]>;
}

export interface PetItemProps {
  pets: FormField<Pet[]>;
  index: number;
}

export function PetList({ pets }: PetListProps) {
  const addPet = usePushItem(pets, { name: "" });

  return (
    <fieldset>
      <legend>Pets</legend>

      {pets.value.map((_value, index) => (
        <PetItem key={index} pets={pets} index={index} />
      ))}

      <p>
        <button type="button" onClick={addPet}>
          Add pet
        </button>
      </p>
    </fieldset>
  );
}

export function PetItem({ pets, index }: PetItemProps) {
  const removePet = useRemoveItem(pets, index);
  const pet = useFieldItem(pets, index);
  const name = useField(pet, "name");

  return (
    <fieldset>
      <legend>Pet #{index + 1}</legend>
      <Input label="Name" field={name} />
      <button type="button" onClick={removePet}>
        Remove
      </button>
    </fieldset>
  );
}
