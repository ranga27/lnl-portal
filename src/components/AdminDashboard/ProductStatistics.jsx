import Rect from 'react';
import PostedRoleStatistics from './ProductComponent/PostedRoleStatistics';
import RoleStatusStatistics from './ProductComponent/RoleStatusStatistics';

const ProductStatistics = ({ roleStatistics }) => {
  return (
    <div>
      <h1>Product Statistics</h1>
      <div>
        <PostedRoleStatistics />
        <RoleStatusStatistics roleStatistics={roleStatistics} />
      </div>
    </div>
  );
};

export default ProductStatistics;
