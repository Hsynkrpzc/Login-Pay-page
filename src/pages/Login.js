import { useState } from "react";
import useApi from "../components/hooks/useApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api = useApi(); // axios geliyor burada

  const onLoginBtnClick = () => {
    // alert ('click') bağlantı sağlanmış  , ` template string bu karakterle başlar biter ${} olarak değişken yazarız
    // alert(`${email} ${password}`); // burada email ve password çalışıyormu kontrol ettik
    const postData = {
      email,
      password,
    };

    // const postData {"email": "test@test.com" , "password": "123asda"} ile aynı
    console.log("postdata", postData);

    api
      .post("auth/login", postData)
      .then((response) => {
        console.log("Response", response);
        console.log("TOKEN", response.data.data.token);
        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.data.token);
          window.location.href = "/#";
          setTimeout(() => {
            window.location.reload();
          }, 111);
        } else {
          alert("Hatalı eposta veya şifre girildi");
        }
      })

      .catch((err) => {
        console.log("error login page",err);
        alert(err.response.data.errorMessage);
      });
  };

  return (
    <main>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div className="col align-self-center">
          <div className="col-12">
            <label
              htmlFor="email"
              className="form-label"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label
              className="form-label"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12 mt-3">
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={onLoginBtnClick}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
