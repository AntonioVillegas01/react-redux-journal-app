import Swal from "sweetalert2";

export const getSwalErr =(message) => {
   return  Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    })
}

export const getSwalSuccess =(message) => {
    return  Swal.fire({
        icon: 'success',
        title: 'Good job!',
        text: message,
    })
}
