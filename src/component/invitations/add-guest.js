import { useState } from "react"
import { AddGuestHeader } from "./add-guest.header"
import { GuestList } from "./GuestList"

export const AddGuest = () => {
    const [open, setOpen] = useState(true)
    return (
        <>
            <GuestList open={open} />
        </>
    )
}