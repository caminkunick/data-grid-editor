import { Box, styled } from '@mui/material'
import { grey } from '@mui/material/colors'

export const ActionBox = styled(Box)(({ theme }) => ({
  border: `solid 1px ${grey[300]}`,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius
}))
