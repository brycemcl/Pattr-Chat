import { default as MaterialButton } from '@material-ui/core/Button' // eslint-disable-line import/no-named-default

function Button ({ color = 'primary', variant = 'contained', children }) {
  return (
    <>
      <MaterialButton variant={variant} color={color}>
        {children}
      </MaterialButton>
    </>
  )
}

// export our default Button component we declared above
export default Button
