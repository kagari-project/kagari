import React, { PropsWithChildren, useState } from "react";
import Dialog from '@mui/material/Dialog'
import DialogTitle from "@mui/material/DialogTitle";
import Typography from '@mui/material/Typography'
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ButtonProps } from "@mui/material";
import Button from "@mui/material/Button";

export type DialogButtonsConfig = {
  text: React.ReactNode,
} & Exclude<ButtonProps, 'children'>
export type DialogConfig = {
  title?: string,
  content?: string,
  buttons?: DialogButtonsConfig[]
}

let dialogRef: ReturnType<typeof useDialog>

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<DialogConfig>({})
  const open = (cfg) => {
    setConfig(cfg)
    setIsOpen(true)
  }
  const close = () => {
    setConfig({})
    setIsOpen(false)
  }
  const updateConfig = (cfg: DialogConfig) => {
    setConfig(cfg)
  }
  return { config, isOpen, open, close, updateConfig }
}



export function DialogProvider({ children }: PropsWithChildren) {
  dialogRef = useDialog()

  return <>
    {children}
    <Dialog open={dialogRef.isOpen} onClose={dialogRef.close}>
      <DialogTitle>{dialogRef.config.title}</DialogTitle>
      <DialogContent>
        <Typography>{dialogRef.config.content}</Typography>
      </DialogContent>
      <DialogActions>
        {
          (dialogRef.config.buttons ?? [])
            .map((btn, i) => (
              <Button
                key={i}
                variant={btn.variant}
                onClick={btn.onClick}>
                {btn.text}
              </Button>
            ))
        }
      </DialogActions>
    </Dialog>
  </>
}

export const dialog = {
  show(cfg: DialogConfig) {
    dialogRef.open(cfg)
  },
  close() {
    dialogRef.close()
  }
}
