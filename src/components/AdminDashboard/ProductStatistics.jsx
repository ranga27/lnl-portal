import Rect from 'react';
import PostedRoleStatistics from './ProductComponent/PostedRoleStatistics';
import RoleStatusStatistics from './ProductComponent/RoleStatusStatistics';

const ProductStatistics = () => {
  return (
    <div>
      <h1>Product Statistics</h1>
      <div>
        <PostedRoleStatistics />
        <RoleStatusStatistics />
      </div>
    </div>
  );
};

export default ProductStatistics;
