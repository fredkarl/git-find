import './styles.css';

function RepoList({title, description}) {
  return (
    <div className='repo-list'>
      <strong>{title}</strong>
      <p>{description}</p>
      <hr />
    </div>
  );
}

export default RepoList;