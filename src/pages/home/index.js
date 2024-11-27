import { useState } from 'react';

import background from '../../assets/background.png';
import "./styles.css";

import Header from "../../components/Header";
import RepoList from '../../components/RepoList';

const App = () => {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    
    if(newUser.name) {
      const { avatar_url, login, name, bio } = newUser;
      setCurrentUser({ avatar_url, login, name, bio });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length) {
        setRepos(newRepos)
      }
    }

  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={background} className="background" alt="background"/>
        <div className='info'>
          <div>
            <input name="usario" placeholder="@username" value={user} onChange={(event) => setUser(event.target.value)}/>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
          <>
            <div className="perfil">
              <img src={currentUser.avatar_url} className="profile" alt="foto perfil" />
              <div>
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr />
          </>
          ) : null}
          {repos?.length ? (
            <div>
              <h4 className="repo">Repositórios</h4>
              {repos.map(repo => (
                <RepoList title={repo.full_name} description={repo.description} />
              ))}
            </div>
          ) : null }
        </div>
      </div>
    </div>
  );
}

export default App;
