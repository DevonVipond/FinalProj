import React from "react";
import CustomNavbar from "../Navbar/Navbar";

const PageWrapper = (WrappedComponent: any) => {
    class Wrapper extends React.Component {
        render() {
            return (
                <div>
                    <CustomNavbar/>
                    <WrappedComponent />
                </div>
            )
        }
    }

    return Wrapper
}

export default PageWrapper