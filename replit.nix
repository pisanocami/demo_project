{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.python310
    pkgs.python310Packages.pip
    pkgs.python310Packages.virtualenv
    pkgs.nodePackages.npm
    pkgs.yarn
  ];

  env = {
    PYTHON_LD_LIBRARY_PATH = "${pkgs.stdenv.cc.cc.lib}/lib";
    PYTHONBIN = "${pkgs.python310}/bin/python3.10";
    LANG = "en_US.UTF-8";
  };
}
