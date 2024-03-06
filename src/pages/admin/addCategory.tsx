import React from "react";
import AddCategoryPage from "../../components/admin/Category/addCategory/category";
import AdminLayout from "../../components/adminLayout/adminLayout";



const AddCategory = () => {
    return (
      <AdminLayout>
          <AddCategoryPage/>
      </AdminLayout>
    );
  };
  
export default AddCategory;