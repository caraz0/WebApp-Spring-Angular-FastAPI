package io.github.caraz0.tfg.configs;

import io.github.caraz0.tfg.service.UserDetailsServ;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
//Comprueba la existencia del token (existJWTTOken())
//Si existe lo desencripta y valida (validateToken())
//Si está todo OK, añade la configuración necesaria al contexto de Spring para autorizar la peticion (setUpSpringAuthentication())
@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(JWTAuthFilter.class);
    @Autowired
    private UserDetailsServ userDetailsServ;
    @Autowired
    private JWTUtils jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (/*(request.getServletPath().contains("/authenticate")) ||*/ (request.getServletPath().contains("/users/save"))){
            filterChain.doFilter(request, response);
            return;
        }
        String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = this.jwtUtil.extractUsername(jwtToken);
            } catch (Exception e) {
                logger.error("Error al obtener el usuario");
            }
        } else {
                logger.error("Token no empieza por Bearer");
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.userDetailsServ.loadUserByUsername(username);
            if(this.jwtUtil.validateToken(jwtToken, userDetails)){
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                logger.error("Token no válido");

            }
        }
        filterChain.doFilter(request, response);
    }
}
