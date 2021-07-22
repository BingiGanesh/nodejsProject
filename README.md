
Note :- Please login first at localhost:4000/admin/login or localhost:4000/user/login to get token and After login pass 
        that token in header Authorization as Bearer (token) to access  End-points.

##Products Route##

    GET-localhost:4000/products/

##Admin Routes##

    POST-localhost:4000/admin/login provide Login details along with request email,password

#Admin login required End-points 

    GET-localhost:4000/admin/view-orders 
    POST-localhost:4000/admin/add-product provide Product details along with request name,description,qty,rate

#Admin Regsiter End-point

    POST-localhost:4000/admin/add-account provide details along with request name,phone,email,password,role=Admin


##User Routes##

    POST-localhost:4000/user/login provide Login details along with request email,password

#User login required End-points 

    GET-localhost:4000/user/my-orders 
    POST-localhost:4000/user/order-product provide Order details along with request product_id,qty,address
    POST-localhost:4000/user/search-product/search_keyword ( search_keyword Replace with to be search product Name )

#User Regsiter End-point

    POST-localhost:4000/user/add-account provide details along with request name,phone,email,password
