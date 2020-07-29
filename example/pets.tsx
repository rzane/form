import * as React from "react";
import { Input } from "./Input";
import { useField, useFieldList, useFieldItem, Field } from "../src";

export interface PetValues {
  name: string;
}

export interface PetListProps {
  field: Field<PetValues[]>;
}

export interface PetItemProps {
  field: Field<PetValues[]>;
  index: number;
}

export function PetList(props: PetListProps) {
  const field = useFieldList(props.field);

  return (
    <fieldset>
      <legend>Pets</legend>

      {field.value.map((_value, index) => (
        <PetItem key={index} field={field} index={index} />
      ))}

      <p>
        <button type="button" onClick={() => field.push({ name: "" })}>
          Add pet
        </button>
      </p>
    </fieldset>
  );
}

export function PetItem(props: PetItemProps) {
  const field = useFieldItem(props.field, props.index);
  const name = useField(field, "name");

  return (
    <fieldset>
      <legend>Pet #{props.index + 1}</legend>
      <Input label="Name" field={name} />
      <button type="button" onClick={field.remove}>
        Remove
      </button>
    </fieldset>
  );
}
