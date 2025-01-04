import Swal from 'sweetalert2';

const successAlert = (title) => {
    const alert = Swal.fire({
        // position: "top-end",
        icon: "success",
        title: title,
        // showConfirmButton: false,
        // timer: 1500
        confirmButtonColor: "#48bb78"
      });

      return alert;
};

export default successAlert;