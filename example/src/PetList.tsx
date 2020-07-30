import * as React from "react";
import { Input } from "./Input";
import {
  Field,
  useField,
  useFieldItem,
  usePushItem,
  useRemoveItem
} from "../../src";

export interface Pet {
  name: string;
}

export interface PetListProps {
  pets: Field<Pet[]>;
}

export interface PetItemProps {
  pets: Field<Pet[]>;
  index: number;
}

export function PetList({ pets }: PetListProps) {
  const addPet = usePushItem(pets);

  return (
    <fieldset>
      <legend>Pets</legend>

      {pets.value.map((_value, index) => (
        <PetItem key={index} pets={pets} index={index} />
      ))}

      <p>
        <button type="button" onClick={() => addPet({ name: "" })}>
          Add pet
        </button>
      </p>
    </fieldset>
  );
}

export function PetItem({ pets, index }: PetItemProps) {
  const removePet = useRemoveItem(pets);
  const pet = useFieldItem(pets, index);
  const name = useField(pet, "name");

  return (
    <fieldset>
      <legend>Pet #{index + 1}</legend>
      <Input label="Name" field={name} />
      <button type="button" onClick={() => removePet(index)}>
        Remove
      </button>
    </fieldset>
  );
}
