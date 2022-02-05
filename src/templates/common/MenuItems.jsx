import { Menu } from "primereact/menu";
import { Divider } from "primereact/divider";

export const MenuItems = () => {
  let items = [
    {
      label: "Departure Time",
      items: [
        {
          label: "Update",
          icon: "pi pi-refresh",
          command: () => {
            this.toast.show({
              severity: "success",
              summary: "Updated",
              detail: "Data Updated",
              life: 3000,
            });
          },
        },
        {
          label: "Delete",
          icon: "pi pi-times",
          command: () => {
            this.toast.show({
              severity: "warn",
              summary: "Delete",
              detail: "Data Deleted",
              life: 3000,
            });
          },
        },
      ],
    },
    {
      label: "Arrival Time",
      items: [
        {
          label: "React Website",
          icon: "pi pi-external-link",
          url: "https://reactjs.org/",
        },
        {
          label: "Router",
          icon: "pi pi-upload",
          command: (e) => {
            window.location.hash = "/fileupload";
          },
        },
      ],
    },
    {
      label: "Boarding Point",
      items: [
        {
          label: "Update",
          icon: "pi pi-refresh",
          command: () => {
            this.toast.show({
              severity: "success",
              summary: "Updated",
              detail: "Data Updated",
              life: 3000,
            });
          },
        },
        {
          label: "Delete",
          icon: "pi pi-times",
          command: () => {
            this.toast.show({
              severity: "warn",
              summary: "Delete",
              detail: "Data Deleted",
              life: 3000,
            });
          },
        },
      ],
    },
    {
      label: "Dropping Point",
      items: [
        {
          label: "Update",
          icon: "pi pi-refresh",
          command: () => {
            this.toast.show({
              severity: "success",
              summary: "Updated",
              detail: "Data Updated",
              life: 3000,
            });
          },
        },
        {
          label: "Delete",
          icon: "pi pi-times",
          command: () => {
            this.toast.show({
              severity: "warn",
              summary: "Delete",
              detail: "Data Deleted",
              life: 3000,
            });
          },
        },
      ],
    },
  ];
  return (
    <>
      <h5>Filters</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>

      <Divider />

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
       
      </p>

      <Divider />

      <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
      </p>

      <Divider />

      <p>
        Temporibus autem quibusdam et aut officiis debitis aut rerum
      </p>

      <Menu model={items} style={{ width: "90%" }} />
    </>
  );
};
