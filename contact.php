         

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Contact confirm</title>
        <meta name = "viewport" content = "width=device-width,initial-scale=1.0">
        <meta name = "author" content = "Drim Lun">
        <link rel="stylesheet" href="css/contactstyle.css">
    </head>

            

    <body>
        <header>
            <h1>Contact Confirmation</h1>
        </header>

        <a href="index.html"><p>Return to Home</p></a>
        <?php
        $contactError = "";
        try {
            $dbh = new PDO('mysql:host=localhost;dbname=yuanhee_finalproject', "yuanhee_yuanhee", ".EA8j@q?*qOD");
            } 
        catch (Exception $e) 
            {
                $contactError .= die('<p style="color:red">Sorry, could not connect to Database:<br>Error as below:<br>' . $e->getMessage() . '<br>Please return to the last page</p>');
            }
        ?>   

        <!--DATA VALIDATION AND INSERTING DATA-->
        <?php
            $name    = test_input($_POST['Name']);
            $email   = test_input($_POST['Email']);
            $message = test_input($_POST['Message']);

            $command = "INSERT INTO CONTACT (name, email, message) VALUES (?,?,?)";
            $stmt = $dbh->prepare($command);
            $result = $stmt->execute(array($name, $email, $message));

            if ($result) {
                $contactError .=  "<br><p>Sent successfully!</p>";
            } else {
                $contactError .=  "<br><p>Failed to send. Sorry.</p>";
            }
            header("Location: contact.php");
            ?>

            <!-- PHP Form Validation -->
            <?php  
            function test_input($data)
            {
                $data = htmlspecialchars($data);
                $data = trim($data);
                $data = stripslashes($data);
            
                return $data;
            }
            ?>

            <?php 
                $dbh = null; 
            ?>  
        <span id="contactError"><?php echo $contactError?></span>

    </body>
</html>


