import { useAuth } from '../contexts/AuthContext'; 
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '0.5rem 1rem', background: '#f0f0f0' }}>
        <Link to="/">home</Link> |{" "}
        <Link to="/write">write</Link> |{" "}
        <Link to="/post/1">example</Link>|{" "}
        <Link to="/ai">ask ai</Link>

      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>welcome, {user.username}</span>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <>
            <Link to="/login">login</Link>|{" "}
            <Link to="/register">register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;