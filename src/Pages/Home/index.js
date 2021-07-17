import react, { useState } from "react";
import axios from "axios";
import * as S from "./styled";
import { useHistory } from "react-router-dom";

function App(props) {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [ error, setError] = useState(false)

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${user}/repos`).then((response) => {
      const repositories = response.data;
      const repositoriesNames = [];
      repositories.map((repository) => {
        repositoriesNames.push(repository.name);
      });
      localStorage.setItem(
        "RepositoriesNames",
        JSON.stringify(repositoriesNames)
      );
      history.push("/repositories");
      setError(false)
    }).catch(err => {setError(true)});
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input
          className="usuarioInput"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <S.Button type="button" onClick={handlePesquisa}>
          Pesquisar
        </S.Button>
      </S.Content>
      {error && 
      <S.ErrorMsg>Usuario nao encontrado!</S.ErrorMsg>
      }
    </S.HomeContainer>
  );
}

export default App;
