## Super Market Billing Project
# ----------- Requirement 
1). Create a page for Billing
    Input Fields required 
    a). Customer Name 
    b). Customer Number 
    c). payment Option ( Cash / card / Online )
    d).    Item                     Quantity           MRP              Discounted Price             Value 
    Ex.    Bread                       2                40                     37.5                  75.00
    e). CGST ( it will show only not editable )
    f). SGST ( It will show only not editable )
    e). Submit button 
    Functionality Required 
    a). Value should automatic fatch ( Quantity * discounted price )
    b). Click on submit - It should generate invoice with customer name, number, total value ( excluding cgst / sgst ), 
        cgst, sgst, payable amount ( including cgst / sgst ), payment method 
    c). After generating bill store it into collection ( Create a collection for storing biils)








2). Create a page where you can show all bills 
    In the page what you have to show - 
        a). Bill no
        b). Customer Name 
        c). Customer Number 
        d). Bill amount 
        e). Paid amount
        f). Generated date
    For creating this page you need to use datatable
    For using datatable first create API which return all bill details which belongs to this organization 




3). Create a page Where you can manage Inventory ( Create collection named Inventory and store all inventory details )
        Input Field requirments 
        a). Brand Name  brandName,itemName,itemQuantity
        b). Item Name 
        c). item Quantity 
        d). Submit 
        Functionality Requirment
        a). click on submit - save it into inventory collection








4). Create a page where you can manage Staff ( Create collection named employee and store all staff details )
        Input Field requirment 
        a). Staff Name
        b). Number 
        c). Email
        d). Date of joining 
        e). Date of Joining 
        f). Salary
        g). Image
        h). Department ( Where employee is working )
        i). submit
        Functionality Requirment 
        a). Click on submit - save into employees collections 


5). Create a page where you have to show total sale ( day wise )
    In the page what you have to show - 
        a). Total sale ( total sale day wise)
        b). Customer Name 
        c). Customer Number 
        d). Bill amount 
        e). Paid amount
        f). Generated date
    For creating this page you need to use datatable
    For using datatable first create API which return all bill details which belongs to this organization