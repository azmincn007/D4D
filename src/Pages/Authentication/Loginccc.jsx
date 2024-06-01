import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const L = () => {
    
  return (
    <div>
      <button onClick={login}>Login with Google</button>
      {userInfo && (
        <div>
          <p>Email: {userInfo.email}</p>
          {/* Display other user information */}
        </div>
      )}
    </div>
  );
};

export default L;
