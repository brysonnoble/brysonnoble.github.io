<html>
    <head>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&family=Geologica:wght@600&family=Poppins:wght@300&display=swap" rel="stylesheet">
    </head>
    <body>
        <div id="controlHub">
            <h2>
                <?php
                    $file = new SplFileObject("samples.txt");

                    // Loop until we reach the end of the file.
                    while (!$file->eof()) {
                        // Echo one line from the file.
                        echo $file->fgets();
                    }

                    // Unset the file to call __destruct(), closing the file handle.
                    $file = null;
                ?>
            </h2>
            <div id="interactable">
                <input type="number" placeholder="Number of responses"/>
                <input type="button" value="Generate!"/>
            </div>
        </div>
    </body>
</html>