import 'ldrs/leapfrog'
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";


export default function Loading() {

  return (
    <Dialog open aria-describedby="alert-dialog-description">
      <DialogContent>
        <l-leapfrog
          size="50"
          speed="2.5"
          color="#47a67e"
          bg-opacity=".01"
        ></l-leapfrog>
      </DialogContent>
    </Dialog>
  );
}