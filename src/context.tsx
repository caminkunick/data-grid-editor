import { BoxProps } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import * as React from 'react'
import { genKey } from './gen.key'

export interface DataGridEditorData {
  rows: { [key: string]: string; id: string }[]
  columns: GridColumns
}

export const defaultData: DataGridEditorData = {
  rows: [{ id: genKey() }, { id: genKey() }],
  columns: [
    { field: genKey(), headerName: 'Column 1', width: 160 },
    { field: genKey(), headerName: 'Column 2', width: 160 }
  ]
}

export interface DataGridEditorProps {
  value?: DataGridEditorData
  onChange?: (data: DataGridEditorData) => void
  componentProps?: {
    rootProps?: BoxProps
  }
}

export interface DataGridEditorContextTypes {
  data: DataGridEditorData
  setData: React.Dispatch<React.SetStateAction<DataGridEditorData>>
  selection: string[]
  setSelection: React.Dispatch<React.SetStateAction<string[]>>
}
export const DataGridEditorContext =
  React.createContext<DataGridEditorContextTypes>({
    data: defaultData,
    setData: () => {},
    selection: [],
    setSelection: () => {}
  })

export const useDGE = () => React.useContext(DataGridEditorContext)
