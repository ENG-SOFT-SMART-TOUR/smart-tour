package backend.dto;

import java.util.List;

public record PerguntaDto(int id, String texto, List<OpcaoDto> opcoes) {}
