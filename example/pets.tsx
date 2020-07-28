import * as React from "react";
import { Input } from "./Input";
import { FieldList, useFieldItem, Field, useFieldList, useField } from "../src";

export interface PetValues {
  name: string;
}

export interface PetListProps {
  field: Field<PetValues[]>;
}

export interface PetItemProps {
  field: FieldList<PetValues>;
  index: number;
}

export function PetList(props: PetListProps) {
  const field = useFieldList(props.field);

  return (
    <fieldset>
      <legend>Pets</legend>

      {field.value.map((_, index) => (
        <PetItem key={index} field={field} index={index} />
      ))}

      <button type="button" onClick={() => field.insert(-1, { name: "" })}>
        Add pet
      </button>
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
