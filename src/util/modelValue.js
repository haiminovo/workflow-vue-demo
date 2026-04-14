export const getModelValue = (props) =>
  props.modelValue !== undefined ? props.modelValue : props.value

export const emitModelValue = (ctx, value) => {
  ctx.$emit('update:modelValue', value)
  ctx.$emit('change', value)
}
