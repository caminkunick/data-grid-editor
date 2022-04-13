import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonProps, styled } from '@mui/material'
import React from 'react'

export const SmallButton = styled(
  ({ icon, ...props }: ButtonProps & { icon: IconProp }) => (
    <Button
      variant='outlined'
      size='small'
      startIcon={<FontAwesomeIcon icon={icon} />}
      {...props}
    />
  )
)({
  fontSize: 12
})
