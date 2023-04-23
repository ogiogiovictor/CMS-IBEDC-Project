import React, { Fragment } from 'react';

const Footer = () => {
    return (
        <Fragment>
        <footer class="footer">
          <div class="w-100 clearfix">
            <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2023 <a href="/" target="_blank">IBEDC</a>. All rights reserved.</span>
            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="icon-heart text-danger"></i> By IBEDC</span>
          </div>
        </footer>
        </Fragment>
    );
}

export default Footer;