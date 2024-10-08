### Type-safe transforms

```tsx
const myForm = createForm({ age: '0' });

<Field
  of={myForm}
  path="age"
  transform={{ in: val => Number(val), out: val => val.toString() }}
>
  {(_, props) => <NumberInput {...props} />} // 'props.value' is typed as
  number
</Field>;
```

### Versus `@modular-forms/solid`

- Field values can be objects or arrays.

  - This makes it possible to bind complex types like `{ minDate: Date; maxDate: Date }`. [The recommended way to do this in `@modular-forms/solid` is very verbose.](https://github.com/fabian-hiller/modular-forms/issues/51#issuecomment-1596244780)

- Form values are non-nullable. This means never having to non-null assert.

- More flexible interface for interoping with custom form components.

  - Custom form components simply need to take in `value`, `onBlur`, and `onChange`.
  - Easily bind components that don't have an underlying `input`, `textarea`, or `select` element.

- Simpler handling of arrays.

  - There is no need to use `FieldArray`. This reduces JSX nesting.

```tsx
export function MyForm() {
  const [fruitForm, { Form, Field, FieldArray }] = createForm({
    initialValues: {
      fruits: [
        {
          name: 'banana',
          isTasty: true,
        },
        {
          name: 'kiwi',
          isTasty: false,
        },
      ],
    },
  });

  return (
    <Form>
      <FieldArray name="fruits">
        {fieldArray => (
          <>
            <For each={fieldArray.items}>
              {(_, index) => (
                <Field name={`fruits.${index()}.isTasty`} type="boolean">
                  {(field, props) => (
                    <Checkbox {...props} value={field.value} />
                  )}
                </Field>
              )}
            </For>
          </>
        )}
      </FieldArray>
    </Form>
  );
}
```

**vs. smorf:**

Note that there's no need to pass the `type` prop, or separately pass the
`value` prop.

```tsx
export function MyForm() {
  const fruitForm = createForm({
    fruits: [
      {
        name: 'banana',
        isTasty: true,
      },
      {
        name: 'kiwi',
        isTasty: false,
      },
    ],
  });

  return (
    <form>
      <For each={fruitForm.value.fruits}>
        {(_, index) => (
          <Field of={fruitForm} path={`fruits.${index()}.isTasty`}>
            {(field, props) => <Checkbox {...props} />}
          </Field>
        )}
      </For>
    </form>
  );
}
```
