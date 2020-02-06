export default function validate(value) {
  let errors = {};
  if (!data.value) {
    data.value = 'This field is required';
  }
  // else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = 'Email address is invalid';
  // }
  return errors;
};