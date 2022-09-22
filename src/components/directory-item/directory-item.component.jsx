import {Link, useNavigate} from "react-router-dom";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate()
    const onNavigateHandler = () => navigate(route)
  return (
    <DirectoryItemContainer>
      <BackgroundImage onClick={onNavigateHandler} imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p><Link to={`${route}`}>Shop Now</Link></p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
