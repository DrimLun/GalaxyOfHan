<!-- Author: Sim Yuan Hee
Description: A social platform for sharing and learning East Asian Culture
Date: November 23 2023 -->

<?php
    // Connect to mysql
    try 
    {
        $dbh = new PDO('mysql:host=localhost;dbname=yuanhee_finalproject', "yuanhee_yuanhee", ".EA8j@q?*qOD");
    } 
    catch (Exception $e) 
    {
        die('</ol><p style="color:red">Could not connect to DB: ' . $e->getMessage() . '</p></body></html>');
    }
?>

<!--DATA VALIDATION AND INSERTING, UPLOADING DATA-->
<?php
    // DATA VALIDATION
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {     
        $postErr        = "";
        $post = $image  = " ";
        $imageError       = $_FILES['image']['error'];
        $imageSize      = $_FILES['image']['size'];
        $imageName      = $_FILES['image']['name'];
        $tmpName        = $_FILES['image']['tmp_name'];

        
        if (empty($_POST["post"]))
        {
            $postErr      = "Please enter something";
        }
        else if ($imageError === 0)
        {
            if ($imageSize > 10485760)
            {
                $imageError = "Sorry, your image is too large (Over 10MB).";
            }
            // Creating New Image Name and Validating Its Extension
            else 
            {
                $imageExtension           = pathinfo($imageName, PATHINFO_EXTENSION);
                $imageExtensionLowercase  = strtolower($imageExtension);

                $allowedExs = array("jpg","jpeg","png","gif","webp");

                //Upload images
                if (in_array($imageExtensionLowercase, $allowedExs))
                {
                    $newImageName       = uniqid("IMG-", true).'.'.$imageExtensionLowercase;
                    $imageUploadPath    = 'post_images/' . $newImageName;
                    move_uploaded_file($tmpName, $imageUploadPath);

                    $imageError = null;
                }
                else
                {
                    $imageError = "You can't upload this type of image";
                }

                $post = test_input($_POST['post']);
                //Reference: https://github.com/codingWithElias/image-upload-php-and-mysql/blob/main/upload.php
            }
        }
    }

//INSERTING POST DETAILS AND MESSAGES
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        $command = "INSERT INTO FORUM (post, newImageName) VALUES (?,?)";
        $stmt = $dbh->prepare($command);
        $result = $stmt->execute(array($post, $newImageName));
        if ($result) 
        {
            $poststatus = "<p>Post created successfully!</p>";
        } 
        else
        {
            $poststatus = "<p>Failed to Post, sorry.</p>";
        }
    }
?>

<!-- PHP Form Data Validation -->
<?php  
function test_input($data)
{
    $data = htmlspecialchars($data);
    $data = trim($data);
    $data = stripslashes($data);
            
    return $data;
}
?>

<!-- DISPLAYING THE POSTS -->
<?php
    // Get images from the database
    $getcommand = "SELECT * FROM FORUM ORDER BY id DESC";
    $stmt = $dbh->prepare($getcommand);
    $stmt->execute();

    if ($stmt->rowCount() > 0) 
    {
        while ($row = $stmt->fetch()) 
        {
            $forum_post .= "<div class='post'><p>" . $row['post'] . "</p><br>";
            
            if ($row['newImageName'] != null)
            {
                $forum_post .= '<img src="post_images/' . $row['newImageName'] . ' "alt="Post Image"></div><br>';
            }
        }
    }
    else if ($stmt->rowCount() === 0)
    {
        echo "<p>Nothing has been posted yet</p>";
    }
?>

<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Forum</title>
        <meta name = "viewport" content = "width=device-width,initial-scale=1.0">
        <meta name = "author" content = "Sim Yuan Hee">
        <link rel="stylesheet" href="css/forumstyle.css">
        <link rel="icon" type="image/png" href="images/Q2.jpg">
    </head>

    <body>
        <header>
            <nav>
                <a href="index.html"><div class = "navc"><p>Home</p></div></a>
                <a href="about.html"><div class = "navc"><p>About</p></div></a>
                <a href="minigames.html"><div class = "navc"><p>Mini-games</p></div></a>
                <a href="contact.html"><div class = "navc"><p>Contact</p></div></a>
            </nav>

            <h1>Forum</h1>
        </header>
    
        <h2>Post Something</h2>

        <form id="post_form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" enctype="multipart/form-data">
            <label name="post">Text:
                <input type="text" name="post" placeholder="Please share some thoughts!" required>
            </label>

            <br>
            <span class="span_error"><?php echo $postErr; ?></span>
            <br>

            <label name="image">Image:
                <input type="file" name="image">
            </label>

            <br>
            <span class="span_error"><?php echo $imageError; ?></span>
            <br>

            <span><?php echo $poststatus; ?></span>
            <input type="submit" value="Post">
        </form>

        <span id="forum">
            <?php echo $forum_post; ?>
        </span>

        <footer>
            <a href="index.html"><p>Home</p></a>
            <a href="about.html"><p>About</p></a>
            <a href="minigames.html"><p>Mini-games</p></a>
            <a href="contact.html"><p>Contact</p></a> 
            <small>Partial rights reserved &copy; Sim Yuan Hee</small>
        </footer>

    </body>
</html>

<?php 
$dbh = null; 
?>