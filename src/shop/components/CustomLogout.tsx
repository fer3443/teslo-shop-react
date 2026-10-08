import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/auth/store'

export const CustomLogout = () => {
  const logout = useAuthStore(state => state.logout)
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer ml-2 border border-slate-300 text-sm font-semibold px-2 py-1 rounded-sm hover:bg-slate-100">
        Cerrar sesión
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Quiere cerrar sesión?</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            variant="destructive"
            size="sm"
            className="ml-2"
            onClick={logout}
          >
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
