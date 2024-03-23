import React, { useState } from 'react'
import { Input } from "@chakra-ui/react"

const EditableCell = () => {
  const [value, setValue] = useState('')
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      //onBlur={onBlur}
      variant="filled"
      size="sm"
      w="85%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    />
  )
}

export default EditableCell
