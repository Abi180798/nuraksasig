export default function CustomError() {
  return (
    <body>
      <div id="layoutError">
        <div id="layoutError_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-6">
                  <div class="text-center mt-4">
                    <img class="mb-4 img-error" src="https://i.ibb.co/59t3LdN/error-concept-white-background-sign-logo-icon-error-concept-simple-vector-icon-123196424.jpg" />
                    <p class="lead">This requested URL was not found on this server.</p>
                    <a href="/">
                      <i class="fas fa-arrow-left mr-1"></i>
                                        Return to Dashboard
                                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutError_footer">
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Copyright &copy; Your Website 2020</div>
                <div>
                  <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
     
    </body>
  )
}