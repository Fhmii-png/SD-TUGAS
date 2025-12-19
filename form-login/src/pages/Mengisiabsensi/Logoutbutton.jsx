import "./button.css";

function Logoutbutton () {
    function tombollogout() {
        alert('Telah Logout');
    }

    return (
        <div>
            <button class ="logout" onClick={tombollogout}>
                Logout
            </button>
        </div>
    );
}

export default Logoutbutton;
